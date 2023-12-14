<template>
    <div>
        <label for="folderPath">Enter Folder Path:</label>
        <input v-model="folderPath" id="folderPath" type="text" />
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" webkitdirectory />
        <button @click="fetchMp4Files">Fetch MP4 Files</button>

        <div class="file-list">
            <h2>MP4 Files</h2>
            <ul>
                <li v-for="file in mp4Files" @click="playVideo(file.fullPath)" :key="file">
                    <img src="https://via.placeholder.com/150" alt="Video Thumbnail" />
                    <span>{{ file.name }}</span>
                </li>
            </ul>
        </div>

        <video ref="videoPlayer" controls class="video-player"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            folderPath: '',
            mp4Files: [],
        };
    },
    methods: {
        async fetchMp4Files() {
            try {
                if ('showDirectoryPicker' in window) {
                    const directoryHandle = await window.showDirectoryPicker();
                    const files = await this.readMp4Files(directoryHandle);
                    this.mp4Files = files;
                } else {
                    // Fallback for browsers that do not support File System Access API
                    this.$refs.fileInput.click();
                }
            } catch (error) {
                console.error('Error fetching MP4 files:', error);
            }
        },
        async handleFileChange(event) {
            const files = event.target.files;
            const mp4Files = await this.readMp4FilesFromFiles(files);
            this.mp4Files = mp4Files;
        },
        async readMp4FilesFromFiles(files) {
            const mp4Files = [];
            for (const file of files) {
                if (file.name.endsWith('.mp4')) {
                    mp4Files.push({ name: file.name, fullPath: URL.createObjectURL(file) });
                }
            }
            return mp4Files;
        },
        async readMp4Files(directoryHandle) {
            const mp4Files = [];
            for await (const [name, handle] of directoryHandle) {
                if (handle.kind === 'file' && handle.name.endsWith('.mp4')) {
                    const file = await handle.getFile();
                    mp4Files.push({ name: handle.name, fullPath: URL.createObjectURL(file) });
                }
            }
            return mp4Files;
        },
        playVideo(fullPath) {
            const videoPlayer = this.$refs.videoPlayer;
            videoPlayer.src = fullPath;
            videoPlayer.play();
            videoPlayer.style.display = 'block';
            videoPlayer.requestFullscreen();
        },
    },
};
</script>




<style scoped>
.file-list {
    display: flex;
    flex-wrap: wrap;
}

.file-list h2 {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.file-list ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.file-list li {
    text-align: center;
    cursor: pointer;
    margin: 1rem;
    transition: transform 0.2s;
}

.file-list li:hover {
    transform: scale(1.1);
}

.file-list img {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 0.5rem;
}

.file-list span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.video-player {
    display: none;
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
}
</style>