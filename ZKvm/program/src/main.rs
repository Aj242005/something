//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.

#![no_main]
sp1_zkvm::entrypoint!(main);
// use std::io::Bytes;

use core::panic;

use fibonacci_lib::is_equal;
pub fn main() {
    // Read an input to the program.
    // Behind the scenes, this compiles down to a custom system call which handles reading inputs
    // from the prover.
    let expected_answer = sp1_zkvm::io::read::<String>();
    let user_answer:String = sp1_zkvm::io::read::<String>();
    // let (a, b) = fibonacci(n);
    if is_equal(expected_answer,user_answer) {
        let buf    = 1;
        sp1_zkvm::io::commit::<i32>(&buf);
    }else{
        panic!("Values are not equal");
    }
    // let bytes  = MyStruct::abi_encode(&MyStruct{value:expected_answer_bytes},&MyStruct{value:user_answer_bytes});
    // // Encode the public values of the program.
    // let bytes = PublicValuesStruct::abi_encode(&PublicValuesStruct { n, a, b });
    // // Commit to the public values of the program. The final proof will have a commitment to all the
    // // bytes that were committed to.
    // sp1_zkvm::io::commit_slice(&bytes);
}
