const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('authorId', 'firstName lastName email');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des publications' });
  }
};

exports.createPost = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Le contenu est requis' });
    }

    const post = await Post.create({
      content,
      authorId: req.user.id,
      privacy: req.body.privacy || 'public'
    });

    console.log('Created post:', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la publication' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    if (post.authorId.toString() !== req.user.id && req.user.role !== 'Admin RH') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    post.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Erreur lors de la modification de la publication' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    if (post.authorId.toString() !== req.user.id && req.user.role !== 'Admin RH') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await post.remove();
    res.json({ message: 'Publication supprimée' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la publication' });
  }
}; 