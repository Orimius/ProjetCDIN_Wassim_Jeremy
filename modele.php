<?php

session_start();

include "data.php";


if (isset($_POST["selection"])) {  /* Vérifie que l'on est ajouté un joueur via le formulaire */
	$_SESSION["selection".$NumPage] = $_POST["selection"];	/* $_SESSION = ID du joueur ajouté */
} 

if (isset($_POST["RAZ"])) {		/* Vérifie qu'on à appuyé sur RAZ */
	foreach ($Poste as $key => $nomPoste) {
		unset($_SESSION["selection".$key]);		/* Réinitialise les valeurs des joueurs sélectionnés */
	}
}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Gestion de l'équipe</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">

</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
    	<div class="container">
		    <a class="navbar-brand" href="accueil.php"> <img class="logo" src="FFF.png"> </a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	        	<span>Menu</span>
	        	<span class="navbar-toggler-icon"></span>
	        </button>
	        <div class="barredenav collapse navbar-collapse" id="navbarResponsive">
	            <ul class="navbar-nav ml-auto">
					<li class="nav-item nav-item-big px-2"><a href="gardien.php">Gardien</a></li>
					<li class="nav-item nav-item-big px-2"><a href="defenseur.php">Défenseur</a></li>
					<li class="nav-item nav-item-big px-2"><a href="milieu.php">Milieu</a></li>
					<li class="nav-item nav-item-big px-2"><a href="attaquant.php">Attaquant</a></li>
				</ul>
			</div>
		</div>
	</nav>
		<div class="container" id="contenue">
			<div class="row">
				<div class="col-lg espace">
					<h1>Équipe actuelle</h1>
					<ul>
						<?php
							$taille_equipe = false;		/* Valeur par défaut de la taille de l'équipe */
							foreach ($Poste as $key => $nomPoste) { 	/* Boucle de chaque poste */
								if (isset($_SESSION["selection".$key])) {	/* Si la variable n'est pas vide affiche les infos sur le joueurs sélectionné */
									echo "<li>".$nomPoste." : ".$players[$_SESSION["selection".$key]]["prenom"]." ".$players[$_SESSION["selection".$key]]["nom"]."</li>";
									$taille_equipe = true;		/* Change la variable en True car l'équipe est non vide */
								} } 
								if (!$taille_equipe) {
									echo "<span>Composer votre équipe en sélectionnant des joueurs. </span>";	/* Si l'équipe est vide affiche le message */
						}?>
					</ul>
					<form method="post"><button class="btn btn-danger btn-lg" type="submit" name="RAZ" value="effacer">RAZ</button></form>
				</div>
				<div class="col-lg"> 
					<h1>Ajouter un <?php echo $Poste[$NumPage]; ?></h1>
					<table class="table">
						<tr class="warning">
							<th>Prénom</th>
							<th>Nom</th>
							<th>Numéro</th>
							<th>Action</th>
						</tr>
						<?php
							foreach ($players as $key => $player) {		/* Boucle de chaque joueurs du tableau "players" */
								if ($player["poste"] == $Poste[$NumPage]) { ?> <!-- Affiche les joueurs correspondants au poste de la page consultée -->
									<tr>
										<td><?php echo $player["prenom"] ?></td>
										<td><?php echo $player["nom"] ?></td>
										<td><?php echo $key ?></td>
										<td><form method="post"><button class="btn btn-success btn-lg" type="submit" name="selection" value="<?php echo $key; ?>">Ajouter</button></form></td> 
									</tr>
						<?php } } ?>
					</table>
				</div>	
			</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>