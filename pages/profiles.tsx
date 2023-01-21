import {
    AppBar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Profiles({ profiles }: { profiles: any[] }) {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" className="app-bar">
                    <Toolbar>
                        <div>
                            <Link href="/">
                                <Image
                                    alt="logo"
                                    src="/logo.svg"
                                    width={200}
                                    height={100}
                                />
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed className="main-section">
                <Box
                    sx={{
                        height: "calc(100vh - 100px)",
                        marginTop: "100px",
                        paddingTop: "4rem",
                    }}
                >
                    <Grid container spacing={3}>
                        {profiles &&
                            profiles.length > 0 &&
                            profiles.map((eleve) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={eleve.id}
                                >
                                    <Card sx={{ width: "100%" }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="340"
                                                image={
                                                    eleve.attributes
                                                        .photo_profil &&
                                                    `http://127.0.0.1:1337${eleve.attributes.photo_profil.data.attributes.url}`
                                                }
                                                alt="profil pic"
                                            />
                                            <CardContent
                                                sx={{
                                                    backgroundColor: "#792550",
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="div"
                                                    sx={{
                                                        color: "white",
                                                    }}
                                                >
                                                    {eleve.attributes.nom}{" "}
                                                    {eleve.attributes.prenom}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: "white",
                                                        }}
                                                    >
                                                        {
                                                            eleve.attributes
                                                                .promotion
                                                        }
                                                        {" - "}
                                                        {
                                                            eleve.attributes
                                                                .filiere
                                                        }
                                                    </Typography>
                                                    {/* <Typography variant="body1">
                                                    {eleve.attributes.filiere}
                                                </Typography> */}
                                                </Box>
                                                {/* <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Lizards are a widespread group
                                                of squamate reptiles, with over
                                                6,000 species, ranging across
                                                all continents except Antarctica
                                            </Typography> */}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    {/* <Box
                                    sx={{
                                        height: "400px",
                                        width: "100%",
                                        border: "1px red solid",
                                    }}
                                >
                                    anouar
                                </Box> */}
                                </Grid>
                            ))}
                    </Grid>
                    {/* {JSON.stringify(profiles)} */}
                </Box>
            </Container>
        </>
    );
}

export async function getServerSideProps(context) {
    let root = "http://127.0.0.1:1337/api/";
    let query = root + "eleves?populate=photo_profil&";

    query += Object.entries(context.query)
        .filter((elem) => {
            const value = elem[1];
            return !!value && value !== "tout";
        })
        .map((elem) => {
            const key = elem[0];
            const value = elem[1];
            if (key === "motCle")
                return `filters[sujet_pfe][$contains]=${value}`;
            if (key === "specialite") return `filters[filiere][$eq]=${value}`;
            if (key === "annee") return `filters[promotion][$eq]=${value}`;
        })
        .join("&");

    console.log(query);

    const response = await fetch(query);
    const resJson = await response.json();

    return {
        props: { profiles: resJson.data },
    };
}
