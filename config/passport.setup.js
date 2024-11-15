import "dotenv/config";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { rows } = await pool.query(`SELECT * FROM app_user WHERE id = $1`, [
    id,
  ]);

  done(null, rows[0]);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { rows } = await pool.query(
        `SELECT * FROM app_user WHERE googleID = $1`,
        [profile.id]
      );

      if (rows.length === 0) {
        await pool.query(
          `INSERT INTO app_user (googleID, username) VALUES ($1, $2)`,
          [profile.id, profile.displayName]
        );

        const { rows } = await pool.query(
          `SELECT * FROM app_user WHERE googleID = $1`,
          [profile.id]
        );
        done(null, rows[0]);
      } else {
        done(null, rows[0]);
      }
    }
  )
);
