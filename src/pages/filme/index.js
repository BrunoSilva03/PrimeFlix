import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api'

import styles from './filme.module.css'

function Filme() {
    const { id } = useParams();
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
                console.log("FILME NÃO ENCONTRADO")
                //caso não encontre o filme
            })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }
    }, [])


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
                    <button>Salvar</button>
                    <button>
                        <a href="#">Trailer</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filme;