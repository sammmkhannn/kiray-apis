import mongoose from "mongoose";

export default function connect(db_uri) {
    mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let conn = mongoose.connection;
    conn.once('open', () => {
        console.log('connected to the database!');
    })
        .on('err', (err) => {
            console.log(err.message);
        }).on('close', () => {
            console.log('connection closed!');
        });
}

