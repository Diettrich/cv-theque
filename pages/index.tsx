import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import Link from "next/link";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const [specialite, setSpecialite] = React.useState("tout");
    const [annee, setAnnee] = React.useState("tout");
    const [motCle, setMotCle] = React.useState("");

    const handleSearch = () => {
        const href = `/profiles?specialite=${specialite}&annee=${annee}&page=1`;
        if (motCle) return router.push(href.concat(`&motCle=${motCle}`));
        router.push(href);
    };

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

            <Container fixed>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 100px)",
                        marginTop: "100px",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        CV-THÉQUE DES LAURÉATS
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            marginTop: "4rem",
                            textAlign: "center",
                        }}
                    >
                        La CV-thèque Université d&apos;Evry contient des
                        informations professionnels sur les lauréats avec un
                        large filtrage permettant des recherches multicritères.
                        Elle constitue une interface numérique pour les lauréats
                        et les recruteurs et facilite leurs rencontres.
                    </Typography>
                    <Box
                        sx={{
                            marginTop: "4rem",
                            gap: "2rem",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <FormControl
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                            size="small"
                        >
                            <InputLabel id="speciality-select">
                                Spécialité
                            </InputLabel>
                            <Select
                                labelId="speciality-select"
                                value={specialite}
                                label="Spécialité"
                                onChange={(e) => setSpecialite(e.target.value)}
                            >
                                <MenuItem value="tout">Tout</MenuItem>
                                <MenuItem value="OPSL">OPSL</MenuItem>
                                <MenuItem value="TNI">TNI</MenuItem>
                                <MenuItem value="IAN">IAN</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                            size="small"
                        >
                            <InputLabel id="annee-select">Année</InputLabel>
                            <Select
                                labelId="annee-select"
                                value={annee}
                                label="Année"
                                onChange={(e) => setAnnee(e.target.value)}
                            >
                                <MenuItem value={"tout"}>Tout</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                            size="small"
                        >
                            <TextField
                                label="Mot clé"
                                defaultValue=""
                                size="small"
                                value={motCle}
                                onChange={(e) => setMotCle(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            marginTop: "3rem",
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
                            onClick={handleSearch}
                        >
                            Recherche
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
