import {  IonButton, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle } from '@ionic/react';
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { ENV } from '../env';

const Login: React.FC = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if(localStorage.getItem('token')){
        window.location.href="/home";
    }

    async function logar(){
        setLoading(true);
        let data = {
            email: email,
            senha: password
        }

        await axios.post(ENV.URL+"login",data)
            .then(res =>res.data)
            .then(res=>{
                localStorage.setItem("token",res.token);
                localStorage.setItem("email",email);
            })
            .catch(e=>{console.error(e)});
        
        await axios.post(ENV.URL+"verifica_token",{token: localStorage.getItem('token') })
            .then(res => res.data)
            .then(res => {
                localStorage.setItem("refreshToken",res.usuarioRs.refreshToken);
                localStorage.setItem("id",res.usuarioRs._id);
                window.location.href="/home";
                setLoading(false);
            })
            .catch(err=>{
                alert(err);
                setLoading(false);
            });
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonLoading isOpen={loading} message="Loading..."></IonLoading>
                <div id="centralizar">
                    <IonTitle class="ion-text-center">Login</IonTitle>
                    <IonItem>
                        <IonLabel position="floating">E-mail</IonLabel>
                        <IonInput type="email" value={email} onIonChange={e=>setEmail(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={e=>setPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonButton expand='block' className='margin-top' onClick={logar}>
                        Logar
                    </IonButton>
                    <IonButton expand='block' color="medium" onClick={()=>{window.location.href="/cadastrar_usuario"}}>
                        Cadstre-se
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
