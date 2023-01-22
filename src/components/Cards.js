import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';


function Cards() {
    const [cards, setCards] = useState([]);

    const handleDetele = async (index) => {

        const id = cards[index].id
        setCards(cards.splice(index, 1));
        console.log('Wyrwałeś chwasta')

        const {data, error} = await supabase
            .from('flashcards')
            .delete()
            .match({'id' : id})
            .select()

        if(error) {
            console.log(error)
        }
        if(data) {
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

    const showCardsArr = () =>{
        console.log(cards)
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
    <div>
        {cards.map((card, index)=>{
            return (
                <div key={card.id} onClick={revertSide.bind(this, index)}>
                    <p>{card.id}</p>
                    {!card.isReverted ? <p>question:{card.question}</p> : <p>answer: {card.answer}</p>}
                    <button onClick={handleDetele.bind(this, index)}>Usuń</button>
                </div>
            )
        })}
        <button onClick={showCardsArr}>ConsoleLogCards</button>
    </div>
    );
}

export default Cards;