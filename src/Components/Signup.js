import { func } from 'prop-types';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { storage, firestore, database } from '../firebase';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, TextField, Button, Card, CardMedia, Typography, LinearProgress } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';

export default function Signup(props) {
    const useStyles = makeStyles({
        mainContainer: {
            height: "100vh",
            width: "75vw",
            // backgroundColor: "lightgreen",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
        },
    })
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userBio, setUserBio] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const { signup } = useContext(AuthContext);

    const handleFileInput = (e) => {
        // Optional Chaining, if exists value else undefined
        let file = e?.target?.files[0];

        if (file) {
            // console.log(file);
            setFile(file);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);

            // 1. Signup user
            let res = await signup(email, password);
            let userUniqueID = res.user.uid;
            const uploadFilesListener = storage.ref(`/users/${userUniqueID}`).put(file);

            // Firebase listener takes, three callback functions
            // fn1 -> progress
            // fn2 -> error 
            // fn3-> success
            uploadFilesListener.on('state_changed', progressTrackFn, errorFn, successFn);

            function progressTrackFn(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log(progress);
            }
            function errorFn(error) {
                setError(error);
                setLoader(false);
            }
            async function successFn() {
                // Get link of profile picture to store.
                let downloadFileURL = await uploadFilesListener.snapshot.ref.getDownloadURL();
                database.users.doc(userUniqueID).set({
                    email,
                    userId: userUniqueID,
                    username,
                    createdAt: database.getUserTimeStamp(),
                    profileImageURL: downloadFileURL,
                    postIds: [],
                    userBio
                })

                setLoader(false);
                props.history.push("/");
            }
        }
        catch (error) {
            setError(error);
            setLoader(false);
        }
    }

    return (
        <>
            <Grid container className={classes.mainContainer} spacing={3}>
                <Grid item xs={12} sm={9} md={7} lg={5}>
                    {loader ? <LinearProgress color="secondary" /> : null}
                    <Card variant="outlined"
                        style={{ padding: "1rem" }}>
                        <CardMedia
                            image="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
                            style={{ backgroundSize: "contain", height: "10rem", }} />
                        <Grid container spacing={1}>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Typography
                                    style={{ textAlign: "center" }}
                                    variant="h6"
                                    gutterBottom
                                    size="small"
                                    style={{ color: "#8395a7", textAlign: "center" }}>
                                    Sign up to see photos and videos from your friends.
                                </Typography>
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-username-input"
                                    label="Username"
                                    type="text"
                                    variant="outlined"
                                    value={username}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-username-input"
                                    label="Bio"
                                    type="text"
                                    variant="outlined"
                                    value={userBio}
                                    fullWidth={true}
                                    size="small"
                                    onChange={(e) => { setUserBio(e.target.value) }}
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth={true}
                                    size="medium"
                                    onChange={(e) => { handleFileInput(e) }}
                                    startIcon={<BackupIcon />}>UPLOAD PROFILE IMAGE
                                    <TextField
                                        type="file"
                                        style={{ opacity: "0", position: "absolute", width: "100%", height: "100%" }}>
                                    </TextField>
                                </Button>
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    fullWidth={true}
                                    style={{ backgroundColor: "#2e86de", color: "#ffffff" }}
                                    size="medium"
                                    disabled={loader}
                                    onClick={handleSignUp}>SIGN UP
                                </Button>
                            </Grid>
                            <Grid
                                item xs={12} sm={12} md={12} lg={12}>
                                <Typography
                                    style={{ textAlign: "center" }}
                                    variant="body2"
                                    gutterBottom
                                    size="small">
                                    By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card
                        variant="outlined"
                        style={{ marginTop: "2rem" }}>
                        <Typography
                            style={{ textAlign: "center", padding: "0.5rem" }}
                            variant="body1"
                            gutterBottom>
                            Have an account? <LinkButton content="Log In"
                                routeLink="/login" />
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

function LinkButton({ content, routeLink }) {
    return (
        <Link style={{ textDecoration: "none", color: "#2e86de" }} to={routeLink}>{content}</Link>
    );
}