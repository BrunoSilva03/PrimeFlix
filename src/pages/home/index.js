import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './home.module.css'

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "60f04d056b064f913e494202bf2286d1",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.splice(0,10));
            setFilmes(response.data.results.splice(0,10))

        }

        loadFilmes();
    }, [])
    return(
        <div className={styles.container}>
           <div className={styles.lista_filmes}>
            {filmes.map((filme) => {
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                        <Link to={`/filme/${filme.id}`}></Link>
                    </article>
                )
            })}
           </div>
        </div>
    )
}

export default Home;