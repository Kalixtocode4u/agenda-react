import ContactItem from "./ContactItem"

function ContactList({ contatos, onDelete, onEdit }){
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
                    editar={() => onEdit(contato)}
                />
            ))}
        </div>
    )
}

export default ContactList