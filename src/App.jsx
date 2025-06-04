import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'


function App() {
  const [showForm, setShowForm] = useState(false)
  const [contatos, setContatos] = useState([])
  const [editandoContato, setEditandoContato] = useState(null)
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

  function updateContact(updatedContact) {
    fetch(`http://localhost:3001/contacts/${updatedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    })
    .then((res) => res.json())
    .then((data) => {
      const updatedList = contacts.map((contact) =>
        contact.id === data.id ? data : contact
      );
      setContatos(updatedList);
      setEditandoContato(null);
    })
    .catch((err) => console.error("Erro ao editar contato:", err));
  }


  function handleEdit(contato){
    setEditandoContato(contato)
  }


  return (
    <>
      <div className="container">
        <h1>Agenda de Contatos</h1>
        {showForm && <ContactForm adicionar={addContact} fechar={() => setShowForm(false)} /> }
        {!showForm && !editandoContato && (
          <button onClick={() => setShowForm(true)} id='addBtn'>
            ➕ Novo Contato
          </button>
        ) }
        {editandoContato && (
          <ContactForm
            initialData={editandoContato}
            adicionar={updateContact}
            fechar={() => setEditandoContato(null)}
          />
        )}
        <ContactList contatos={contatos} onDelete={deleteContact} onEdit={handleEdit}/>
      </div>
    </>
  )
}

export default App
