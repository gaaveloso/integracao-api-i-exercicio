import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";


export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [url, setUrl] = useState("");

  const pegarMusicas = () => {
    // console.log(props);
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        {
          headers: {
            authorization: "gabriel-veloso-ammal",
          },
        }
      )
      .then((response) => {
        setMusicas(response.data.result.tracks);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    pegarMusicas();
  }, []);

  const addMusica = () => {
    const body = {
      artist: artista,
      name: titulo,
      url,
    };
    const input ={
        headers: {
            authorization: "gabriel-veloso-ammal"
        }
    }
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        body,
        input
      )
      .then((response) => {
        console.log(response);
        pegarMusicas();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const apagarMusica = (id) => {

    const input ={
        headers: {
            authorization: "gabriel-veloso-ammal"
        }
    }

    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
        input
      )
      .then((res) => {
        console.log(res);
        pegarMusicas();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => apagarMusica(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />
        <InputMusica
          placeholder="musica"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
