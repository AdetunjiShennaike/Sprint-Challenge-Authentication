1. What is the purpose of using _sessions_?
  to allow the user to stay logged in while they use your application without having to re-input their information every time the page refreshes or they enter a new page

1. What does bcrypt do to help us store passwords in a secure manner.
  bcrypt allows us to encrypt and decrypt the password a user generates, to ensure if someone is capable of seeing the stored information the end up seeing the stored encryption instead of password itself

1. What does bcrypt do to slow down attackers?
  it forces them to have to reverse engineer the hash that was created, instead of just having the information 

1. What are the three parts of the JSON Web Token?
    the header, the payload, and the signature
    the header contains the algorithm and token type, the payload is the information that should be stored within the token, typically a user id. The signature is the finisher, it combines the header and payload with the secret to create the token.