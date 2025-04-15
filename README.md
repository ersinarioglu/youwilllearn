# YouWillLearn - Educational Video Platform

## Overview

YouWillLearn is a web application that allows users to create, share, comment on, and watch educational videos. It provides an intuitive interface for users to engage with educational content.

## Features

- **Video Library**: Browse through a collection of educational videos.
- **Video Playback**: Watch videos with playback controls.
- **Video Details**: View video information, including title, description, and upload date.
- **Comments**: Leave comments on videos and view comments from other users.
- **Add Videos**: Share new educational videos by providing a title, description, and video URL.
- **Playback Controls**: Adjust video playback speed and volume.
- **Full Screen Mode**: Watch videos in full screen.
- **Responsive Design**: Works on desktop and mobile devices.

## Screenshots

![Home Page](screenshots/home_page.png)
![Video Page](screenshots/video_page.png)
![Add Video Form](screenshots/add_video.png)

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **React Router**: For application routing
- **React Player**: For video playback
- **React Icons**: For UI icons
- **Axios**: For API calls
- **CSS**: For styling components

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/youwilllearn.git
   cd youwilllearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Using the Demo Application

The application comes with mock data for demonstration purposes. You can:

1. Browse the list of pre-loaded educational videos
2. Select a video to watch it and view its details
3. Add comments to a video (they will persist only during the session)
4. Add your own videos using the "Add New Video" button
5. Control video playback with the custom player controls

Note: Since this is a demo using mock data, all changes are stored in memory and will be lost upon page refresh.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `build` directory with optimized production-ready files.

## API Integration

The application interacts with the backend API at `https://take-home-assessment-423502.uc.r.appspot.com/api` with the following endpoints:

- `GET /videos`: Fetch all videos
- `GET /videos/:id`: Fetch a specific video
- `POST /videos`: Create a new video
- `GET /videos/:id/comments`: Fetch comments for a video
- `POST /videos/:id/comments`: Add a comment to a video

The user_id format for creating videos should be your name in snake_case format, for example: `john_smith`.

## Future Enhancements

- User authentication and profiles
- Video categories and tags
- Video search functionality
- Video ratings and likes
- User playlists
- Video recommendations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or feedback, please contact:
- Email: your.email@example.com
- GitHub: [Your GitHub Profile](https://github.com/yourusername)
