import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'


function App() {
  const [showForm, setShowForm] = useState(false)
  const [contatos, setContatos] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/contatos")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setContatos(data);
      })
      .catch(function(err) {
        console.error("Erro ao buscar contatos:", err);
      });
  }, [])

  function addContact(newContato){
    fetch("http://localhost:3001/contatos",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newContato)
      }
    ).then(function(res){
      return res.json()

    }).then(function(data){
      setContatos([...contatos, data])
      setShowForm(false)

    }).catch(function(err){
      console.error("Erro ao adicionar o novo contato, Err: " + err)

    })
  }

  function deleteContact(id){
    fetch(`http://localhost:3001/contatos/${id}`,
      {
        method: "DELETE",
      }
    ).then(function(res){
      if(res.ok){
        setContatos(contatos.filter((contato) => contato.id != id))
      }else{
        console.error("Erro ao deletar o novo contato.")
      }
    }).catch(function (err) {
      console.error("Erro ao deletar o novo contato, err: " + err)
    })
  }


  return (
    <>
      <div className="container">
        <h1>Agenda de Contatos</h1>
        {showForm && <ContactForm adicionar={addContact} fechar={() => setShowForm(false)} /> }
        {!showForm && <button onClick={() => setShowForm(true)} id='addBtn'>➕ Novo Contato</button> }
        <ContactList contatos={contatos} onDelete={deleteContact} />
      </div>
    </>
  )
}

export default App
