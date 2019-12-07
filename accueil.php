<?php

session_start();

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

$Poste = array(
	1 => "Gardien",
	2 => "Défenseur",
	3 => "Milieu",
	4 => "Attaquant",
);


if(!isset($NumPage)) { // Affiche par défaut la page gardien
	$NumPage = 1;
}

if(isset($_POST["RAZ"])) {	// Efface les joueurs sélectionné quand on appuie sur RAZ
	foreach ($_SESSION as $key => $value) {
		unset($_SESSION[$key]);
	}
}

if(isset($_POST["player"])) {	// Affiche les joueurs sélectionné dans la liste
	$id = $_POST["player"];
	$_SESSION["POS_".$NumPage] = $id;
}
?>



<!DOCTYPE html>
<html>
<head>
	<title>Gestion de l'équipe</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="accueil.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
    	<div class="container">
		    <a class="navbar-brand" href="accueil.php">
		            <img class="logo" src="FFF.png">
		    </a>
	       	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	        	<span>Menu</span>
	        	<span class="navbar-toggler-icon"></span>
	        </button>
	        <div class="barredenav collapse navbar-collapse" id="navbarResponsive">
	            <ul class="navbar-nav ml-auto">
	                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="gardien.php">Gardien</a></li>
	                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="defenseur.php">Défenseur</a></li>
	                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="milieu.php">Milieu</a></li>
	                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="attaquant.php">Attaquant</a></li>
	            </ul>
	        </div>
	    </div>
    </nav>
	<div class="container" style="margin-top: 3%; float: none;">
		<div class="row">
			
			<div class="col-lg"> 
				<h1>Équipe actuelle</h1>
				<ul>
					<?php
						$taileEquipe = 0;
						foreach ($Poste as $key => $value) {
							if(isset($_SESSION["POS_".$key])) { 
								echo "<li>" . $value . " : " . $players[$_SESSION["POS_".$key]]["prenom"] . " " . $players[$_SESSION["POS_".$key]]["nom"] ." </li>";
								$taileEquipe = 1;
							}
						}
						if($taileEquipe == 0) {
							echo "<p> L'équipe est vide ! Ajoutez des joueurs. </p>";
						}
					?>
				</ul>
				<?php if($taileEquipe == 1) { ?>
					<form method="post"><button class="btn btn-danger" type="submit" name="RAZ" value="RAZ">RAZ</button></form>	
				<?php } ?>
				
			</div>

			<div class="col-lg">
				<h1> Ajoutez un <?php echo $Poste[$NumPage]; ?> </h1>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Prénom</th>
							<th scope="col">Nom</th>
							<th scope="col">Numéro</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($players as $key => $player) { 
							if ($player["poste"] == $Poste[$NumPage]) { ?>
							<tr>
								<td><?php echo $player["prenom"] ?></td>
								<td><?php echo $player["nom"] ?></td>
								<td><?php echo $key ?></td>
								<td>
									<form method="post">
										<button class="btn btn-success" type="submit" name="player" value="<?php echo $key; ?>">Ajouter</button>
									</form>
								</td>
							</tr>
							<?php }
						} ?>
					</tbody>
				</table>
			<div>
		</div>
	</div>
    </nav>
</body>
</html>