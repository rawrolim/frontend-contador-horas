import {  IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { ENV } from '../env';
import { add, checkmark, play } from "ionicons/icons";

interface controleHorario{
    _id: string,
    usuario_id: string,
    tempo: Number,
    data_hora_inicial: Date,
    data_hora_fim: Date,
    status: Boolean,
    apontando: Boolean
}

const Home: React.FC = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [descricao, setDescricao] = useState("");
    const [controles, setControles] = useState<controleHorario[]>([]);
    
    useEffect(() => {
        getControles();
    }, []);

    async function cadastrar(){
        await tokenValido();

        const data = {
            token: token,
            descricao: descricao,
            usuario_id: localStorage.getItem("id")
        }

        axios.post(ENV.URL+'controle_horario', data, {headers: {
            email: ''+localStorage.getItem("id"),
            token: ''+token
        }})
            .then(r=>getControles())
            .catch(e=>console.error(e));
    }

    async function getControles(){
        await tokenValido();

        axios.get(ENV.URL+'controle_horario',{headers: {
            email: ''+localStorage.getItem("email"),
            token: ''+token,
            usuario_id: ''+localStorage.getItem("id")
        }})
            .then(res => res.data)
            .then(data => setControles(data))
            .catch(e=>console.error(e));
    }

    async function tokenValido(){    
        await axios.post(ENV.URL+'verifica_token', {token: token})
            .then(res=>res.data)
            .catch(e=>refreshToken());
    }

    async function refreshToken(){
        var data = {
            refreshToken: localStorage.getItem("refreshToken"),
            email: localStorage.getItem("email")
        }

        await axios.post(ENV.URL+'refresh_token',data)
            .then(res=>res.data)
            .then(res=>{salvarToken(res)})
            .catch(r=>{
                localStorage.clear();
                window.location.href="/login";
            });
    }

    async function salvarToken(token: any){
        localStorage.setItem("token",token);
        setToken(token);

        await axios.post(ENV.URL+'verifica_token', {token: token})
            .then(res=>res.data)
            .then(res=>{
                localStorage.setItem("refreshToken",res.usuarioRs.refreshToken);
            })
            .catch(e=>console.error(e));
    }
    
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='ion-padding ion-margin-top d-flex'>
                    <IonItem >
                        <IonLabel position='floating'>Descrição</IonLabel>
                        <IonInput type='text' value={descricao} onIonChange={e=>setDescricao(e.detail.value!)} />
                    </IonItem>
                    <IonButton onClick={cadastrar} className='ion-float-end'>
                        <IonIcon icon={add}></IonIcon>
                    </IonButton>
                </div>
                <div className='ion-margin-top '>
                    { controles.map(r=>{
                        return (
                            <div key={r._id}>
                                <IonItem >
                                    <div className='wrap'>asasdassssssssssssssssssssssssssssssssssssds</div>
                                    <div className='time'>3 s</div>
                                </IonItem>
                                <IonButton className='ion-float-end'><IonIcon icon={play}></IonIcon></IonButton>
                                <IonButton className='ion-float-end'><IonIcon icon={checkmark}></IonIcon></IonButton>
                            </div>
                    )}) }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
