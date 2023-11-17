import styles from './favoritos.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
        //minhaLista vem como string do localStorage, então tem que
        //converter em um array de volta.
        //se não tiver nada dentro desse array ele retorna um array vazio.
    }, [])

    function excluirFilme(id) {
        //o filter vai devolver todos os itens que passam na nossa condição.
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        })
        //aqui filtra o array dentro do objeto da  state filmes e devolve todos os itens cujo item
        //é diferente do id que recebo por parâmetro 


        setFilmes(filtroFilmes);
        //salva a state com filtroFilmes, porque já tirou o 
        //filme que queria excluir da lista de filmes.

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        //salva no localStorage todos os filmes menos aquele com 
        //o id que excluímos da lista de filmes

        toast.success("Filme removido com sucesso")
    }

    return(
       <div className={styles.meus_filmes}>
        <h1>Meus Filmes</h1>


        {filmes.length === 0 && <span>Você não possui nenhum filme salvo no momento</span>}
        <ul>
            {filmes.map((item) => {
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            {/* pra ver os detalhes no link /filme/id-do-filme*/}
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
       </div>
    )
}

export default Favoritos;