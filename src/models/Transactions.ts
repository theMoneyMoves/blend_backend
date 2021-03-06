import { pool } from '../utils/pool';


export class Transaction {
    id: string;
    sender_id: number;
    recipient_id: number;
    payment_intent_id: string;
    amount: number; 
    payment_confirmed : boolean;
    constructor(public row:{ 
        id: string;
        sender_id: number;
        recipient_id: number;
        payment_intent_id: string;
        amount: number; 
        payment_confirmed : boolean;
    }){
        this.id = row.id;
        this.sender_id = row.sender_id;
        this.recipient_id = row.recipient_id;
        this.payment_intent_id = row.payment_intent_id;
        this.amount = row.amount; 
        this.payment_confirmed = row.payment_confirmed;
    }

    static async insertTransaction(transaction:{
        sender_id: number;
        recipient_id: number;
        payment_intent_id: string;
        amount: number; 
        payment_confirmed : boolean;
    }){
        const { rows } = await pool.query(
            `INSERT INTO transactions (sender_id, recipient_id,  payment_intent_id, amount, payment_confirmed) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [transaction.sender_id,transaction.recipient_id, transaction.payment_intent_id, transaction.amount, transaction.payment_confirmed]
        )

        return new Transaction(rows[0]);
    }



}