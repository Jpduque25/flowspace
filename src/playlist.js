import React from 'react';

function Playlist() {
    return(

        <div className = "spotify">
            <iframe
            src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?utm_source=generator&theme=0"
            width="420"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading = "lazy"
            title= "Study Playlist"
            ></iframe>
        </div>
    );
}

export default Playlist;
