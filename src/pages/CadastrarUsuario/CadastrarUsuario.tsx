import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useState } from 'react';
import { ENV } from '../env';
import './CadastrarUsuario.css';

const CadastrarUsuario: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function cadastrar(){
        let data = {
            nome: name,
            email: email,
            senha: password
        }

        axios.post(ENV.URL+'usuario',data)
            .then(r=>{
                window.location.href='/';
            })
            .catch(r=>alert('Não foi possível realizar o cadastro.'));
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Cadastrar Usuário</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel position='floating'>Nome</IonLabel>
                    <IonInput type="text" onIonChange={e=>setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='floating'>E-mail</IonLabel>
                    <IonInput type="email" onIonChange={e=>setEmail(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position='floating'>Senha</IonLabel>
                    <IonInput type="password" onIonChange={e=>setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <IonButton expand='full' onClick={cadastrar}>
                    Cadastrar
                </IonButton>
                <IonButton expand='full' onClick={()=>{window.location.href="/"}}>
                    Cancelar
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CadastrarUsuario;
