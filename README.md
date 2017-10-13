# new project organization
[pcpio](https://github.com/pcpio)  

# pcpio
Provable computing protocol, framework and test/main network(s) for massively scalable dapps with provable state transitions. In contrast to consensus based blockchain protocols, provable computing is based on strong mathematical proofs, e.g. no 51% attacks or other consensus related issues possible.  

### Provable computing protocol (PCP)
The core idea is simple, two kinds of actors (code runers), prover and verifier. To make a state transition in large decentralized network an actor (prover) runs provable transaction code. To finalise the transaction other actor (verifier) verifies that results of transaction code run is correct.  
The integrity of state transitions is based on computing graph. All transaction outputs are hashed and time stamped to make verification possible.     

### Computing graph
Provable computing graph (PCG) is a state transition DAG.  
Fragments of PCG are distributed over peers network, every prover keeps its own transactions and can optionally hire other nodes to store PCG data.  

### Transaction/transition code
1st implementation is js, 2nd is webassembly with special security mechanisms, no gas needed.

### Transaction code vs smartcontract
Executed by one prover, and verified by one or more verifiers.  
Can do async tasks and make network calls.  
Similar to web pages js but server side.     

### Security issues/attacks
Double spending/non atomic data change brakes PCG data integrity.
Transaction code is in isolated environment (js/wasm).

### Integration (bitcoin/ethereum)
Latest initiatives from most popular cryptocurrency networks are based on extensions and integrations. Good example is [ethereum plasma framework](http://plasma.io/plasma.pdf).  
Transition state to/from outer networks (bitcoin, ethereum, etc.) increases integrity and data protection mechanisms.

### Implementation
jspcp - nodejs pcpio protocol implementation/ js transaction code  
gopcp - golang pcpio protocol implementation/ wasm transaction code  

### White paper
asap  

