import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api'

import styles from './filme.module.css'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            //await para esperar essa nossa requisição
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "60f04d056b064f913e494202bf2286d1",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
                //case de sucesso caso o filme exista!!!
            })
            .catch(() => {
                console.log("FILME NÃO ENCONTRADO");
                //caso não encontre o filme
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }
    }, [navigate, id]);


    function salvarFilme() {
        //nomeando a chave do meu localStorage como @primeflix
        //e a mesma vai ter o retorno dentro dessa variável minhaLista
        const minhaLista = localStorage.getItem("@primeflix");


        //Se essa lista existe eu continuo com ela, senão eu inicio um array vazio.
        //JSON.parse para converter em lista de novo porque quando envia uma lista tem que transformar em string.
        //se tiver alguma coisa na minhaLista ele vai colocar na variável filmesSalvos, se não tiver ele vai vir como
        //undefined e vai criar um array vazio.
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //verificando se em filmesSalvos já tem o filme que você está escolhendo para salvar.
        //se o id do filmeSalvo agora for igual ao id de algum filme já presente na state filme
        //então não vai salvar o filme de novo repetidamente uai
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            alert('Este filme já está salvo nos seus favoritos!!!');
            return;
        }

        //colocando mais um item no filmesSalvos, o filme que é o objeto que está no nosso useState
        filmesSalvos.push(filme);

        //agora salvando um filme no localStorage, primeiro passa a chave que declaramos lá em cima,
        //depois JSON.stringify pra transformar pra uma string porque não conseguimos salvar um array
        //no localStorage
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("FILME SALVO COM SUCESSO!!!");

    }


    if(loading) {
        return(
            <div className={styles.filmeInfo}>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div>
            <div className={styles.filmeInfo}>
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

                <h3>Sinopse</h3>
                <span>{filme.overview}</span>

                <strong>Avaliação: {filme.vote_average} / 10</strong>

                <div className={styles.areaButtons}>
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>Trailer</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filme;