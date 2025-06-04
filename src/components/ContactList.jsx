import ContactItem from "./ContactItem"

function ContactList({ contatos, onDelete }){
    return (
        <div>
            {contatos.map((contato) => (
                <ContactItem
                    key={contato.id}
                    id={contato.id}
                    nome={contato.nome}
                    telefone={contato.telefone}
                    email={contato.email}
                    deletar={onDelete}
                />
            ))}
        </div>
    )
}

export default ContactList