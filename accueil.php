<?php

session_start();
if(isset($_POST["raz"])) {
	foreach ($posList as $key => $value) {
		if(isset($_SESSION["POS_".$key])) { 
			unset($_SESSION["POS_".$key]);
		}
	}
}
if(isset($_POST["joueur"])) {
	$id = $_POST["joueur"];
	$_SESSION["POS_".$PosPage] = $id;
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
	<title>Gestion de l'équipe</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="accueil.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
	    <a class="navbar-brand" href="accueil.php">
	            <img class="logo" src="FFF.png" alt="">
	    </a>
       	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        	<span>Menu</span>
        	<span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="gardien.php">Gardien</a></li>
                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="defenseur.php">Défenseur</a></li>
                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="milieu.php">Milieu</a></li>
                <li class="nav-item nav-item-big px-2"><a class="nav-link" href="attaquant.php">Attaquant</a></li>
            </ul>
        </div>
    </nav>
	<div class="container" style="margin-top: 3%">
		<div class="row" style="margin-top: 5%;">
			
			<div class="col-lg">
				<h1>Équipe actuelle</h1>
				<ul style="margin-top: 8%;">
					<?php
						$minimum = false;
						foreach ($posList as $key => $value) {
							if(isset($_SESSION["POS_".$key])) { 
								echo "<li>" . $value . ": " . $players[$_SESSION["POS_".$key]]["prenom"] . " " . $players[$_SESSION["POS_".$key]]["nom"] ." </li>";
								$minimum = true;
							}
						}
						if(!$minimum) {
							echo "<p> L'équipe est vide ! Ajoutez des joueurs. </p>";
						}
					?>
				</ul>
				<?php if($minimum) { ?>
					<form method="post"><button class="btn btn-danger" type="submit" name="RAZ" value="RAZ">RAZ</button></form>	
				<?php } ?>
				
			</div>

			<div class="col-lg">
				<h1> Ajoutez un <?php echo $posList[$PosPage]; ?> </h1>
				<table style="margin-top: 5%" class="table">
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
							if ($player["poste"] == $posList[$PosPage]) { ?>
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