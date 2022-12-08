import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

function Playlists() {
    
    const [playlists, setPlaylists] = useState([])

    const input ={
        headers: {
            authorization: "gabriel-veloso-ammal"
        }
    }

    const pegarPlaylist = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", input)
        .then((response)=>{
            console.log("deu certo");
            console.log(response.data.result.list);
            setPlaylists(response.data.result.list)
        })
        .catch((error)=> {
            console.log("deu erro");
            console.log(error);
        })
    }

    useEffect(()=>{
        pegarPlaylist()
    }, [])

  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} id={playlist.id}/>
            })}

        </div>
    );
}

export default Playlists;
