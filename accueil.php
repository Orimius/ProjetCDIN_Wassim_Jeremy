<?php

session_start();
if(isset($_POST["RAZ"])) {
	foreach ($posList as $ => $value) {
		if(isset($_SESSION["POS_".$key])) { 
			unset($_SESSION["POS_".$key]);
		}
	}
}
if(isset($_POST["joueur"])) {
	$id = $_POST["joueur"];
	$_SESSION["POS_".$PagePos] = $id;
}

?>

<?php

$players = array(
	1 => array(  "nom" => "Lloris", "prenom" => "Hugo", "poste" => "Gardien"),
	2 => array(  "nom" => "Pavard", "prenom" => "Benjamin", "poste" => "Défenseur"),
	4 => array(  "nom" => "Varane", "prenom" => "Raphaël", "poste" => "Défenseur"),
	5 => array(  "nom" => "Lenglet", "prenom" => "Clément", "poste" => "Défenseur"),
	6 => array(  "nom" => "Ndombele", "prenom" => "Tanguy", "poste" => "Milieu"),
	7 => array(  "nom" => "Griezmann", "prenom" => "Antoine", "poste" => "Attaquant"),
	9 => array(  "nom" => "Giroud", "prenom" => "Olivier", "poste" => "Attaquant"),
	10 => array(  "nom" => "Mbappé", "prenom" => "Kylian", "poste" => "Attaquant"),
	12 => array(  "nom" => "Tolisso", "prenom" => "Corentin", "poste" => "Milieu"),
	13 => array(  "nom" => "Kanté", "prenom" => "N'Golo", "poste" => "Milieu"),
	16 => array(  "nom" => "Mandanda", "prenom" => "Steve", "poste" => "Gardien"),
	17 => array(  "nom" => "Sissoko", "prenom" => "Moussa", "poste" => "Milieu"),
	18 => array(  "nom" => "Fékir", "prenom" => "Nabil", "poste" => "Attaquant"),
	21 => array(  "nom" => "Dubois", "prenom" => "Léo", "poste" => "Défenseur"),
	23 => array(  "nom" => "Areola", "prenom" => "Alphonse", "poste" => "Gardien"),
);

$posList = array(
	1 => "Gardien",
	2 => "Défenseur",
	3 => "Milieu",
	4 => "Attaquant",
);
?>

<!DOCTYPE html>
<html>
<head>
	<title>Gestion équipe</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span>Menu</span>
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
</body>
</html>