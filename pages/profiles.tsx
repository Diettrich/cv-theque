import {
    AppBar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Pagination,
    Toolbar,
    Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profiles({
    profiles,
    pageCount,
    pageSize,
}: {
    profiles: any[];
    pageCount: number;
    pageSize: number;
}) {
    const router = useRouter();
    console.log(router.query);

    const loadProfile = (id: string) => () => {
        router.push(`/profile/${id}`);
    };

    const handleChangePage = (event: any, value: number) => {
        const href = `/profiles?specialite=${router.query.specialite}&annee=${router.query.annee}&page=${value}`;
        if (router.query.motCle)
            return router.push(href.concat(`&motCle=${router.query.motCle}`));
        router.push(href);
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
                <Box
                    sx={{
                        minHeight: "calc(100vh - 200px)",
                        marginTop: "100px",
                        marginBottom: "100px",
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
                                        <CardActionArea
                                            onClick={loadProfile(eleve.id)}
                                        >
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
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                    <Box
                        sx={{
                            marginTop: "4rem",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Pagination
                            count={pageCount}
                            onChange={handleChangePage}
                            size="large"
                            shape="rounded"
                        />
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export async function getServerSideProps(context: any) {
    let root = "http://127.0.0.1:1337/api/";
    let query = root + "eleves?populate=photo_profil&";

    query += Object.entries(context.query)
        .filter((elem) => {
            const key = elem[0];
            const value = elem[1];
            if (key === "page") return false;
            return !!value && value !== "tout";
        })
        .map((elem) => {
            const key = elem[0];
            const value = elem[1];
            if (key === "motCle")
                return `filters[$or][0][sujet_pfe][$contains]=${value}&filters[$or][1][entreprise_pfe][$contains]=${value}`;
            if (key === "specialite") return `filters[filiere][$eq]=${value}`;
            if (key === "annee") return `filters[promotion][$eq]=${value}`;
        })
        .join("&");

    query += `&pagination[page]=${context.query.page}&pagination[pageSize]=12`;

    console.log(query);

    const response = await fetch(query);
    const resJson = await response.json();

    return {
        props: {
            profiles: resJson.data,
            pageCount: resJson.meta.pagination.pageCount,
            pageSize: resJson.meta.pagination.pageSize,
        },
    };
}
