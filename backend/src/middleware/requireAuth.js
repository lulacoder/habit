export const requireAuth = (auth) => async (req, res, next) => {
	try {
		const session = await auth.api.getSession({ headers: req.headers });

		if (!session) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		req.userId = session.user.id;
		return next();
	} catch (error) {
		return next(error);
	}
};
