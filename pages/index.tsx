import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [specialite, setSpecialite] = React.useState(undefined);

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
                                value={"age"}
                                label="Spécialité"
                                // onChange={}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                            size="small"
                        >
                            <InputLabel id="demo-select-small">Age</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={specialite || ""}
                                label="Age"
                                // onChange={}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, minWidth: 120, width: "100%" }}
                            size="small"
                        >
                            <InputLabel id="demo-select-small">Age</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={"age"}
                                label="Age"
                                // onChange={}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
