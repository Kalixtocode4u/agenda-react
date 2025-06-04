import { useState } from "react"
import "./ContactForm.css"

function ContactForm({adicionar, fechar, initialData}){
    const [nome, setNome] = useState(initialData.nome || "")
    const [telefone, setTelefone] = useState(initialData.telefone || "")
    const [email, setEmail] = useState(initialData.email || "")

    function handleSubmit(event){
        event.preventDefault()

        const newContato = {
            id: initialData.id,
            nome: nome,
            telefone: telefone,
            email: email,
        }

        adicionar(newContato)

        setNome("")
        setTelefone("")
        setEmail("")
    }

    return (
        <form onSubmit={handleSubmit} className="forms">
            <div className="flex-form">
                <label htmlFor="">Nome
                    <input type="text"
                        required
                        id="InpNome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="inptForm"
                        placeholder="Nome"
                    />
                </label>

                <label htmlFor="">Telefone
                    <input type="tel"
                        required id="InpEmail"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="inptForm"
                        placeholder="Telefone"
                    />
                </label>

                <label htmlFor="">Email
                    <input type="email"
                        required
                        id="InpPhone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inptForm"
                        placeholder="Email"
                    />
                </label>

                <div className="botoes">
                    <button type="submit" className="add" >Adicionar</button>
                    <button type="button" className="close" onClick={fechar} >Cancelar</button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm