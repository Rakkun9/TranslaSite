import TranslaSite from '../pages/TranslaSite.astro';

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(){
    const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'});

    const prompt = "What is the meaning of life? sumarize it in 100 words or less";
    const result = await model.generateContent(prompt);
    const response = await result.response; 
    const text = response.text(); 
    console.log(text);
}
run(); 