
import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client';

const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;


export default function ChatBox(props) {

    const {userInfo} =props;
    const [socket , setSocket] = useState(null);
    const uiMessageRef  = useRef(null);
    const [isOpen , setIsOpen] = useState(false);
    const [messageBody , setMessageBody] = useState('');
    const [messages , setMessages] = useState([

        {name: 'Admin' , body :" Bonjour , Posez votre question s'il vous plait"},
    ]);

    useEffect(() => {
        if( uiMessageRef.current){
            uiMessageRef.current.scrollBy({
                top: uiMessageRef.current.clientHeight,
                left:0,
                behavior: 'smooth',
            });
        }
        if(socket){
            socket.emit('onLogin' , {
                _id : userInfo.id ,
                name: userInfo.name,
                isAdmin : userInfo.isAdmin,
            });
            socket.on('message' , (data) => {
                setMessages([...messages , {
                    body : data.body ,
                    name: data.name ,
                }]);
            });
        }
    } , [messages, isOpen, socket, userInfo.id, userInfo.name, userInfo.isAdmin]);

    const supportHandler = () =>{
        setIsOpen(true);
        console.log(ENDPOINT);
        const sk  = socketIOClient(ENDPOINT);
        setSocket(sk);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if(!messageBody.trim()){
            alert('Message vide , Veuillez saisir un message');
        }else{
            setMessages([...messages , {
                body:messageBody,
                name: userInfo.name
            }]);
            setMessageBody('');
            setTimeout(() =>{
                socket.emit('onMessage' , {
                    body:messageBody,
                    name:userInfo.name,
                    isAdmin:userInfo.isAdmin,
                    _id:userInfo.id,
                });
            } , 1000 );
        }
    };
    const closeHandler = () =>{
        setIsOpen(false);
    };
  return (
    <div className ="chatbox">
        {!isOpen ?(
            <button type="button" onClick={supportHandler}>
                <i className="fa fa-support"></i>
            </button>
        ):(
            <div className="offre offre-body">
                <div className="row">
                    <strong>Support</strong>
                    <button type="button" onClick={closeHandler}>
                        <i className="fa fa-close"></i>
                    </button>
                </div>
                <ul ref={uiMessageRef}>
                    {messages.map((msg, index) =>(
                        <li key={index}>
                            <strong>{`${msg.name}:`}</strong> {msg.body}
                        </li>
                    ))}
                </ul>
                <div>
                    <form onSubmit={submitHandler} className="row">
                        <input
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            type="text"
                            placeholder="Saisir un  message"
                        />
              <button type="submit" className="">Envoyer</button>
            </form>
                </div>
            </div>
        )
    }

    </div>
  )
}
