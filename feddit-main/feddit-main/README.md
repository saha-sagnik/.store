<img style="display: flex; justify-content: center" src="src/Frontend/Public/images/logo.png">
<hr>

[Reddit clone made in 1 week.](https://feddit.space)

<img style="border: 2px solid white; border-radius: 20px; margin-top: 20px" src="https://github.com/face-hh/tweetfree/assets/69168154/9b3aece8-4ca4-4bd6-8f0e-bb124e29fdf8">

<br>

As seen on [YouTube](https://youtu.be/m99yug6F9D8)

# Contribution
Feel free to contribute to the project!

# Issues
I am aware that there are a lot of issues with the project, if possible, open issues only for severe problems.

# Self-hosting
1. Create `.env` with the following contents:
```
DB=
Encryption_Key=
```
DB = MongoDB connection string.

Ecryption_Key = A string which will be used to encrypt the session cookies

2. Run `npm i`
3. Run `npm test`
4. Go to `https://127.0.0.2:3000`

# Encryption
[Passwords](https://npmjs.com/package/bcrypt) and [session cookies](https://www.npmjs.com/package/jsonwebtoken) are encrypted. 
```
Password example: $2b$10$3TsrEozOYxBa/nAwrwZazudUc68ut.oTR/o1RCXRASLnJxi7zMHw.
Session cookie example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDk2YTQ4NmUyMDZmM2RiNTI1Zjc3NjciLCJkYXRlIjoxNjg4Mzk1NzYwNjY1LCJhZGRvbiI6IjE4ODk5NjIzNDNkMDk1ZTkzNjAzNmE2ODVhOTA1NDRmMWQ0MDQzYTYxZTc5MDY1NiIsInN1YmZlZGRpdHMiOnt9LCJkZXNjcmlwdGlvbiI6IkkgaGF2ZW4ndCBzZXQgYSBkZXNjcmlwdGlvbiB5ZXQhIiwiaWF0IjoxNjg4Mzk1NzYwfQ.CJgeCdC1VKKQ5oPuGg7veLnO1pkcAg8Y_vG-en7e1BQ
```

# Algorithm
## Also available inside `/src/Backend/Routes/generatefeed.js`
![image](https://github.com/face-hh/feddit/assets/69168154/9a011785-a469-4bb6-a6f1-eb1fb283bfab)

# License
Apache-2.0


DB='mongodb+srv://sbmunnu:munnu@mongo.mzaad3h.mongodb.net/wallmart?retryWrites=true&w=majority'
Encryption_Key='K'