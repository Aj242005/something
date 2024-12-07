//! An end-to-end example of using the SP1 SDK to generate a proof of a program that can be executed
//! or have a core proof generated.
//!
//! You can run this script using the following command:
//! ```shell
//! RUST_LOG=info cargo run --release -- --execute
//! ```
//! or
//! ```shell
//! RUST_LOG=info cargo run --release -- --prove
//! ```

use alloy_sol_types::SolType;
use clap::Parser;
// use fibonacci_lib::PublicValuesStruct;
use sp1_sdk::{include_elf, HashableKey, ProverClient, SP1Stdin};

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const FIBONACCI_ELF: &[u8] = include_elf!("fibonacci-program");

/// The arguments for the command.
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(long)]
    execute: bool,

    #[clap(long)]
    prove: bool,

    #[clap(long, default_value = "20")]
    expected_answer: String,

    #[clap(long, default_value = "20")]
    user_answer: String
}

fn main() {
    // Setup the logger.
    sp1_sdk::utils::setup_logger();

    // Parse the command line arguments.
    let args = Args::parse();

    if args.execute == args.prove {
        eprintln!("Error: You must specify either --execute or --prove");
        std::process::exit(1);
    }

    // Setup the prover client.
    let client = ProverClient::new();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();
    stdin.write(&args.expected_answer);
    stdin.write(&args.user_answer);
    println!("expected: {}, user: {}", args.expected_answer,args.user_answer);
    if args.execute {
        // Execute the program
        let (output, report) = client.execute(FIBONACCI_ELF, stdin).run().unwrap();
        println!("Program executed successfully.");
        // Read the output.
        let (expected_isequal) = fibonacci_lib::is_equal(args.expected_answer,args.user_answer );
        assert!(expected_isequal);
        println!("Answer is correct");
        // Record the number of cycles executed.
        println!("Number of cycles: {}", report.total_instruction_count());
    } else {
        // Setup the program for proving.
        let (pk, vk) = client.setup(FIBONACCI_ELF);
        let vkey:String = vk.bytes32();
        std::fs::write("vkey.txt", vkey).expect("saving vkey failed");
        // Generate the proof   
        let proof = client
            .prove(&pk, stdin).groth16()
            .run()
            .expect("failed to generate proof");
        let public_values = proof.public_values.as_slice();
        println!("public values: 0x{}", hex::encode(public_values));

        std::fs::write("public.txt", hex::encode(public_values)).expect("saving public values failed");

        // Get the proof as bytes.
        let solidity_proof = proof.bytes();
        // println!("proof: 0x{}", hex::encode(solidity_proof));
        
        std::fs::write("proof.txt",hex::encode(solidity_proof)).expect("saving proof failed");

        // Debug the value of proof.

        // Verify the proof.
        // client.verify(&proof, &vk).expect("failed to verify proof");
        // println!("Successfully verified proof!");
    }
}
