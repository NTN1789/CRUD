import React from "react";

import { Component } from "react";
import axios from   'axios'
import Main from "../templete/main/Main"


const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'cadastro de usuários: incluir , listar , alterar e Excluir'

}

// fazer uma refatoração em constante e usa exports e import
const baseUrl = 'http://localhost:3001/users'
const initialState = {
        user: {name: '' , email: '' , telefone: " "} , 
        list: []

}

// fazer o userTable , userForm  , separar component 

export default class userCrud extends Component{

        state = {...initialState}

        componentWillMount(){   // essa chamada vai ocorrer quando o componente ira ser exibido  na tela
            axios(baseUrl).then(resp => {
                this.setState({list: resp.data})
            })

        }

        clear(){                    //limpar o formulario
            this.setState({user: initialState.user})

        }

        save(){ //serve para alterar um usuario existente ou inserir um novo usuario
            const user = this.state.user
            const method = user.id ? 'put' : 'post'
            const url = user.id  ? `${baseUrl}/${user.id}` : baseUrl // vai variar a url
            axios [method] (url,user)
            .then(resp => {     //o usuario que foi incluido ou alterado
                                 // vai estar sincroinizado com o backend

                    const list = this.getUpdatedList(resp.data)  
                    this.setState({user: initialState , list})  //alterar o user ou quando salvar o formulario e quiser apagar as coisas

            })


        }

        getUpdatedList(user, add = true) {
            const list = this.state.list.filter(u => u.id !== user.id)
         if(add)list.unshift(user)
            return list

        }

        // atualizar o nome e email

        updateField(event){
                const user = {...this.state.user}
                user[event.target.name] = event.target.value
                this.setState({user})
        }

            renderForm(){  //renderizar o formulário
                return (
                        <div className="form">
                            <div className="row">
                                <div className="col-12  col-md-6">
                                   <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" 
                                    name="name"
                                    value={this.state.user.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome... "/>

                                    </div> 
                                </div>
                                    <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>E-mail</label>
                                        <input type="text" className="form-control"
                                            name="email"
                                            value={this.state.user.email}
                                            onChange={e => this.updateField(e)}
                                            placeholder="digite o e-mail..." />

                                    </div>
                                    </div>
                                    <div className="col-12 col-md-6" >
                                    <div className="form-group">
                                        <label>Telefone</label>
                                        <input type="text" className="form-control"
                                          name="telefone" 
                                          value={this.state.user.telefone}
                                          onChange={e => this.updateField(e)}
                                          placeholder="digite o seu telefone"  />
                                        </div>
                                    </div>

                            </div>

                             <hr/>
                             <div className="row">   
                                    <div className="col-12 d-flex justify-content-end">
                                        <button className="btn btn-primary"
                                             onClick={e => this.save(e)} >
                                                    salvar
                                        </button>

                                        <button className="btn btn-secondary ml-2"
                                            onClick={e => this.clear(e)} >
                                            Cancelar
                                        </button>
                                    </div>
                             </div>

                        </div>
                )

            }
            // duas funcoes , uma para alterar o usuario e outras coisas dentro dele . e a outra para excluir i usuario

                load(user){
                    this.setState({user})
                }

                remove(user){
                    axios.delete(`${baseUrl}/${user.id}`)  // para excluir oque tiver no DB.json em que o cliente poderá remover
                    .then(resp => {
                        const list = this.getUpdatedList(user, false) // não adicionar nada dps da lista
                        this.setState({list})
                    })
                    
                }

                renderTable(){

                        return(
                                <table className="table mt-4">
                                    <thead>
                                        <tr>
                                                      <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>E-mail</th>
                                                    <th>AÇões</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRows()}
                                    </tbody>
                                </table>
                        )
                }

                renderRows(){
                    return this.state.list.map(user => {
                        return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td> {user.name}</td>
                                    <td> {user.email}</td>
                                    <td> {user.telefone}</td>
                                    <td>
                                        <button className="btn btn-warning"
                                         onClick={() => this.load(user)}>
                                            <i className="fa fa-pencil "></i>
                                        </button>
                                        <button className="btn btn-danger ml-2"
                                         onClick={() => this.remove(user)}   >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                        )
                    }) 
                }

    render(){
       return(

            <Main {...headerProps}>
               {this.renderForm()}
               {this.renderTable()}
            </Main>

        )
    }

}