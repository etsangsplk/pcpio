# plasmagun
Provable computing protocol, framework and test/main network(s) for massively scalable dapps with provble state transitions. In contrast to consensus based blockchain protocols, provable computing is based on strong mathematical proofs.

### Provable computing protocol (PCP)
The core idea is simple, two kinds of actors (code runers), prover and verifier. To make a state transition in large decentralized network an actor (prover) runs provable transaction code. To finalise the transaction other actor (verifier) verifies that results of transaction code run is correct.  
The integrity of state transitions is based on computing graph. All transaction outputs are hashed and timestemped to make verification possible.     

### Computing graph
Provable computing graph (PCG) is a state transition DAG.  
Fragments of PCG are destributed over peers network, every prover keeps its own transactions and can optionaly hire other nodes to store PCG data.  

### Transaction/transition code
Transaction code execution is not limited by technology, it can be implemented as software, hardware on top of any stack and architecture.

### Integration
Latest iniciatives from most popular crypto currency networs are based on extensions and integrations. Good example is (ethereum plasma framework)[http://plasma.io/plasma.pdf].  
Transition state to/from outher networks (bitoin, ethereum, etc.) increases protection mechanisms.




