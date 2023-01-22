import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import "./Cards.scss";


function Cards() {
    const [cards, setCards] = useState([]);


    const handleDelete = async (index) => {

        const id = cards[index].id
        setCards(prev => {
            return prev.filter(card => card.id !== id)
        })
        
        const {data, error} = await supabase
            .from('flashcards')
            .delete()
            .match({'id' : id})
            .select()

        if(error) {
            console.log(error)
        }
        if(data) {
            console.log("penisek")
            console.log(data)
            console.log(index);
        }
    }
    const revertSide = (eventIndex) => {

        let newState = cards.map((el, index) => {
            if(index === eventIndex){
                return{
                    ...el,
                    isReverted: !el.isReverted
                }
            }else{
                return el
            }
        })
        setCards(newState);
    }

    useEffect(()=>{
        const fetchCards = async () => {
            
            const { data, error } = await supabase
                .from('flashcards')
                .select()

            if(error){
                setCards([])
                console.log('could not fetch the data')
            }
            if(data) {
                setCards(data.map(card => {
                    return {
                        ...card,
                        isReverted: false
                    }
                }))
            }
        }

        fetchCards();

    },[])

    return (
    <div className="cardsContainer">
        {cards.map((card, index)=>{
            return (
                <div key={card.id} className="singleCardContainer">
                    <div className="card" onClick={revertSide.bind(this, index)}>
                        {!card.isReverted ? <h3>Kategoria: {card.category}</h3> : <h3>Odpowiedź:</h3>}
                        {!card.isReverted ? <p>{card.question}</p> : <p>{card.answer}</p>}
                    </div>    
                    <button className="deleteCard"onClick={handleDelete.bind(this, index)}>Usuń</button>
                </div>
            )
        })}
    </div>
    );
}

export default Cards;