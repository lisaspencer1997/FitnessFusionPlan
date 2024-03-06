import React, { useState } from 'react';

const SpotifyPlaylist = () => {
    // The state is not necessary but leaving in case of future development
    const [embedLink, setEmbedLink] = useState(localStorage.getItem('FitnessFusionConfig') && JSON.parse(localStorage.getItem('FitnessFusionConfig')).playlist);

    return (
        <div className='mt-3'>
            {embedLink && (
                <div dangerouslySetInnerHTML={{ __html: embedLink }} />
            )}
        </div>
    )
}

export default SpotifyPlaylist;