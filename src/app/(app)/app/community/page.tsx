"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Filter,
  Loader2,
  Send,
} from "lucide-react";
import { Card, Badge, SectionHeader, StatCard } from "@/components/common";
import {
  getCommunityPosts,
  getTopMembers,
  getCommunityGroups,
  togglePostLike,
  joinGroup,
  type CommunityPost,
  type CommunityMember,
  type CommunityGroup,
} from "@/data/community";

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [topMembers, setTopMembers] = useState<CommunityMember[]>([]);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, membersData, groupsData] = await Promise.all([
          getCommunityPosts(),
          getTopMembers(5),
          getCommunityGroups(),
        ]);
        setPosts(postsData);
        setTopMembers(membersData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLike = async (postId: string) => {
    const result = await togglePostLike(postId);
    if (result.success) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, likes: result.newLikeCount }
            : post
        )
      );
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    const result = await joinGroup(groupId);
    if (result.success) {
      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? {
                ...group,
                isJoined: !group.isJoined,
                membersCount: group.isJoined
                  ? group.membersCount - 1
                  : group.membersCount + 1,
              }
            : group
        )
      );
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString("fr-FR");
  };

  if (loading) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-[#00D1FF]" />
          </div>
        </div>
      </main>
    );
  }

  const filters = [
    { key: "all", label: "Tout" },
    { key: "progression", label: "Progression" },
    { key: "lfg", label: "Recherche groupe" },
    { key: "astuce", label: "Astuces" },
  ];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête */}
        <div className="mb-8">
          <SectionHeader
            icon={Users}
            badge="Communauté"
            title="Échangez avec la communauté"
            description="Partagez vos victoires, posez vos questions et trouvez des coéquipiers"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            value="1,247"
            label="Membres actifs"
            color="#00D1FF"
          />
          <StatCard
            icon={MessageCircle}
            value={posts.length.toString()}
            label="Posts aujourd'hui"
            color="#10B981"
          />
          <StatCard
            icon={Trophy}
            value="89"
            label="Défis complétés"
            color="#F59E0B"
          />
          <StatCard
            icon={TrendingUp}
            value="+23%"
            label="Cette semaine"
            color="#8B5CF6"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fil d'actualité */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filtres */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-white/40 shrink-0" />
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter.key
                      ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Composer un post */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/20 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#00D1FF]" />
                </div>
                <input
                  type="text"
                  placeholder="Partagez quelque chose avec la communauté..."
                  className="flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50"
                />
                <button className="w-10 h-10 rounded-xl bg-[#00D1FF] flex items-center justify-center hover:bg-[#00D1FF]/90 transition-colors">
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} hover className="p-5">
                  {/* Auteur */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{post.author.username}</span>
                        {post.author.archetype && (
                          <Badge variant="info" size="sm">
                            {post.author.archetype}
                          </Badge>
                        )}
                        <Badge variant="default" size="sm">
                          Niv. {post.author.level}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(post.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Contenu */}
                  <p className="text-white/80 mb-4 leading-relaxed">{post.content}</p>

                  {/* Image */}
                  {post.image && (
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt="Image du post"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        post.isLiked
                          ? "text-[#EF4444]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`}
                      />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                      Partager
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top membres */}
            <Card glow glowColor="#00D1FF" className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F59E0B]" />
                Top membres cette semaine
              </h3>
              <div className="space-y-3">
                {topMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {/* Rang */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                          : index === 1
                          ? "bg-white/20 text-white"
                          : index === 2
                          ? "bg-[#CD7F32]/20 text-[#CD7F32]"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      #{index + 1}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                        <Image
                          src={member.avatar}
                          alt={member.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#121212]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{member.username}</p>
                      <p className="text-xs text-white/40">
                        +{member.xpThisWeek.toLocaleString()} XP
                      </p>
                    </div>

                    {/* Level */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${member.archetypeColor}20`,
                        color: member.archetypeColor,
                      }}
                    >
                      {member.level}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Groupes suggérés */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8B5CF6]" />
                Groupes suggérés
              </h3>
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${group.color}20` }}
                      >
                        {group.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm" style={{ color: group.color }}>
                          {group.name}
                        </h4>
                        <p className="text-xs text-white/50 mb-2 line-clamp-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span>{group.membersCount.toLocaleString()} membres</span>
                          <span>•</span>
                          <span>{group.postsThisWeek} posts/semaine</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className={`w-full mt-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        group.isJoined
                          ? "bg-white/10 text-white/60 hover:bg-white/15"
                          : "bg-[#00D1FF]/20 text-[#00D1FF] hover:bg-[#00D1FF]/30"
                      }`}
                    >
                      {group.isJoined ? "Membre ✓" : "Rejoindre"}
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Événements */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F59E0B]" />
                Événement en cours
              </h3>
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/5 border border-[#F59E0B]/30">
                <p className="font-semibold text-[#F59E0B] mb-1">Défi de la semaine</p>
                <p className="text-sm text-white/70 mb-3">
                  Complétez 3 guides pour gagner un badge exclusif !
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Fin dans 4 jours</span>
                  <span className="text-[#F59E0B] font-medium">+500 XP</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
