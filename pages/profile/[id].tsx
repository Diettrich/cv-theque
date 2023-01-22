/* eslint-disable @next/next/no-img-element */
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Profile({ eleve }: any) {
    const viewCV = () => {
        const cvUrl =
            "http://localhost:1337" + eleve.attributes.cv.data.attributes.url;
        window.open(cvUrl, "_blank", "noreferrer");
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" className="app-bar">
                    <Toolbar>
                        <Link href="/">
                            <Image
                                alt="logo"
                                src="/logo.svg"
                                width={200}
                                height={100}
                            />
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid
                    container
                    sx={{
                        minHeight: "calc(100vh - 200px)",
                        marginTop: "100px",
                        marginBottom: "100px",
                        paddingTop: "4rem",
                    }}
                    spacing={4}
                >
                    <Grid item xs={4}>
                        <img
                            src={`http://localhost:1337${eleve.attributes.photo_profil.data.attributes.url}`}
                            alt="profile pic"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Nom :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.nom}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Prénom :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.prenom}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Promotion :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.promotion}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Fillière :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.filiere}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Entreprise PFE :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.entreprise_pfe}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sujet PFE :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.sujet_pfe}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Entreprise actulle :
                                        </TableCell>
                                        <TableCell>
                                            {
                                                eleve.attributes
                                                    .entreprise_actuelle
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.email}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Téléphone :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.telephone}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{
                                            "& td": { border: 0 },
                                        }}
                                    >
                                        <TableCell>Email :</TableCell>
                                        <TableCell>
                                            {eleve.attributes.email}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {eleve.attributes.cv.data && (
                            <Box
                                sx={{
                                    marginTop: "2rem",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: "1rem 2rem",
                                        backgroundColor: "#5d0532",
                                        "&:hover": {
                                            backgroundColor: "#7d0945",
                                        },
                                    }}
                                    onClick={viewCV}
                                >
                                    Voir CV
                                </Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const query = `http://127.0.0.1:1337/api/eleves/${context.query.id}?populate=*`;

    const response = await fetch(query);
    const resJson = await response.json();

    return {
        props: {
            eleve: resJson.data,
        },
    };
}
