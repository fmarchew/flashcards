import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

function AddNewCard() {

    const [newCard, setNewCard] = useState({
        question: '',
        answer: '',
        category: ''
    })
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!newCard.question || !newCard.answer || !newCard.category){
            setFormError('Wypełnij wszystkie pola!')
            return
        }

        // console.log(newCard.question, newCard.answer, newCard.category )
        const {data, error} = await supabase
        .from('flashcards')
        .insert([newCard])
        .select()

        if(error) {
            console.log(error)
            setFormError('Cos poszło nie tak :(')
        }
        if(data) {
            console.log(data)
            setFormError(null)
            setNewCard({
                question: '',
                answer: '',
                category: ''
            });
        }
    }


    return ( 

        <div>
            <form className="AddNewCard" onSubmit={handleSubmit}>
                <label>Pytanie:</label>
                <input 
                    type="text" 
                    id="question"
                    value={newCard.question}
                    onChange={(event)=> setNewCard({...newCard, question: event.target.value})}
                />
                <label>Odpowiedź:</label>
                <input 
                    type="text" 
                    id="answer"
                    value={newCard.answer}
                    onChange={(event)=> setNewCard({...newCard, answer: event.target.value})}
                />
                <label>Kategoria:</label>
                <input 
                    type="text" 
                    id="category"
                    value={newCard.category}
                    onChange={(event)=> setNewCard({...newCard, category: event.target.value})}
                />
                <button type="submit">submit</button>

                {formError && <p className="error">{formError}</p>}

            </form>
        </div>

    );
}

export default AddNewCard;