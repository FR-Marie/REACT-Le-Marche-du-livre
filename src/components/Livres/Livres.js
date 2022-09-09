import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Livres.module.css';
import axios from "axios";


const Livres = () => {

    //hook pour afficher les livres
    const [livres, setLivres] = useState([]);

    //hook pour récupérer un livre (ensuite afficher détails)
    const [livreClic, setLivreClic] = useState(null);
    //hook pour récupérer l'index de l'objet dans le tableau json (toujours pour afficher détails)
    //(-1 car un tableau démarre toujours à 0)
    const [livreIndex, setLivreIndex] = useState(-1);


    //FONCTION POUR AFFICHER TOUS LES LIVRES
    const afficherLivres = ()=>{
        axios.get(`http://localhost:3001/livres`)
            .then(response => {
                setLivres(response.data);
                console.log(response.data)
            })
            .catch(erreur => {
                console.error('Erreur dans la requête HTTP' + erreur)
            })
    }


    //FONCTION POUR RECUPERER ET AFFICHER LES DETAILS D'UN SEUL LIVRE
    const detailsLivre = (livre, index) =>{
        setLivreClic(livre);
        setLivreIndex(index);

        console.log(livre);
        console.log(index);
    }

    const refresh = () =>{
        window.location.reload(false)
    }





//On passe un tableau en second paramètre pour éviter des appel infinis de la fonction
    useEffect(()=>{
        afficherLivres()
    }, [])

    return (
        <div className={styles.Livres}>

            {/*CONDITION SI LIVRECLIC POUR AFFICHER UN SEUL LIVRE*/}
            {livreClic ?(
                <div className="container mb-5">
                    <div className="row-cols-6 text-center">
                        <button className="btn btn-primary text-warning" onClick={refresh}> RETOUR </button>
                        {/*onClick={() => detailsLivre(livre, index)}*/}
                    </div>


                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <h3 id="h3-details" className="mt-5 text-center">{livreClic.titre}</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 offset-1">
                            <img id="img-details" src={livreClic.image} alt={livreClic.titre} title={livreClic.titre}/>
                        </div>

                        <div className="col-lg-6 col-sm-12 border-start border-light">
                            <div id="genre-auteur" className="mt-4">
                                <div className="m-0"><span className="p-card m-0">Genre:</span> {livreClic.genre}</div>
                                <div className="m-0"><span className="p-card m-0">Auteur:</span> {livreClic.auteur}</div>
                            </div>
                            <div className="">
                                <p className="m-0"><span className="p-card">Prix:</span> {livreClic.prix}€</p>
                                <p className="m-0"><span className="p-card">Stock: <span id="stock">{livreClic.stock ? "En stock" : "Epuisé"}</span></span></p>
                                <p className="m-0"><span className="p-card">Résumé:</span><p className="">{livreClic.description}</p></p>
                            </div>
                        </div>
                    </div>

                    <div className="row  mt-5">

                            <div className="col-lg-6 col-sm-12 offset-1">
                                <button className="btn btn-primary text-info">EDITER</button>
                                <button className="ms-1 btn btn-primary text-danger">SUPPRIMER</button>
                            </div>


                    </div>

                </div>

            ):(
            <div className="row">
                {livres.map((livre, index) =>
                    <div className="col-lg-3 col-sm-12 mt-5 mb-2" key={index}>

                        <div id="livre-card" className="card h-100">

                            <div className="card-body">

                                <div className="row">
                                    <div className="col-4">
                                        <img id="card-img" className="card-img" src={livre.image} alt={livre.titre} title={livre.titre}/>
                                    </div>

                                    <div className="col-8 card-title">
                                        <h3 className="p-1">{livre.titre}</h3>
                                        <div id="genre-auteur">
                                        <div className="m-0"><p className="p-card m-0">Genre:</p> {livre.genre}</div>
                                        <div className="m-0"><p className="p-card m-0">Auteur:</p> {livre.auteur}</div>
                                        </div>
                                    </div>
                                    {/*fermeture row*/}
                                </div>

                                <div className="row">
                                    <p className="m-0"><span className="p-card">Prix:</span> {livre.prix}€</p>
                                    <p className="m-0"><span className="p-card">Stock: <span id="stock">{livre.stock ? "En stock" : "Epuisé"}</span></span></p>
                                    <p className="m-0"><span className="p-card">Résumé:</span><p className="p-description">{livre.description}</p></p>
                                </div>

                                {/*fermeture body*/}
                            </div>

                            <div id="card-footer" className="card-footer bg-primary text-center">
                                <button id="btn-details" onClick={() => detailsLivre(livre, index)}>DETAILS & COMMANDE</button>
                            </div>

                            {/*fermeture card*/}
                        </div>
                        {/*fermeture col*/}
                    </div>
                )}
                {/*fermeture row*/}
            </div>
            )}
            {/*fermeture div principale*/}
        </div>
    )



};


Livres.propTypes = {};

Livres.defaultProps = {};

export default Livres;
