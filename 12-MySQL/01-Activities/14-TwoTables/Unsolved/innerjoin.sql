Use top_songsDB;

SELECT top_albums.year, top_albums.position, top_albums.artist, top5000.song, top_albums.album
FROM top_albums
	inner join top5000 on top_albums.artist = (top5000.artist AND top_albums.year = top5000.year)
    where (top5000.artist = 'Queen' AND  top_albums.artist ='Queen') ORDER BY top_albums.year, top_albums.position;
    