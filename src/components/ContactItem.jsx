import './ContactItem.css'

function ContactItem({id, nome, telefone, email, deletar, editar}){

    return (
        <div className='contact-card'>
            <img src="user.svg" width={"100px"}/>
            <h2>{nome}</h2>
            <p>📞 {telefone}</p>
            <p>✉️ {email}</p>
            <div id='block' >
                <button id='editar' onClick={editar}>Editar</button>
                <button id='excluir' onClick={() => deletar(id)}>Excluir</button>
            </div>
        </div>
    )
}

export default ContactItem;