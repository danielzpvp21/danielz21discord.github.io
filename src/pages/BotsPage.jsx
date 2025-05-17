import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { BotList } from "@/components/BotList";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, BarChartBig, History, Users, Star } from "lucide-react"; // Added Star
import { useLocation, useNavigate } from "react-router-dom";
import { BotLoadingSpinner } from "@/components/BotLoadingSpinner";

const BotsPage = ({ bots, onToggleAddBot }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(queryParams.get("filter") || "todos");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sort") || "rating_desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX if bots load very fast
    const timer = setTimeout(() => setIsLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (categoryFilter !== "todos") params.set("filter", categoryFilter);
    if (sortOrder !== "rating_desc") params.set("sort", sortOrder);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchTerm, categoryFilter, sortOrder, navigate, location.pathname]);


  const categories = useMemo(() => {
    if (!bots || bots.length === 0) return ["todos", "adicionados", "populares"];
    const allTags = bots.reduce((acc, bot) => {
      (bot.tags || []).forEach(tag => acc.add(tag));
      return acc;
    }, new Set());
    return ["todos", "adicionados", "populares", ...Array.from(allTags).sort()];
  }, [bots]);

  const filteredAndSortedBots = useMemo(() => {
    if (!bots) return [];
    let filtered = bots.filter(bot => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = bot.name.toLowerCase().includes(lowerSearchTerm) ||
                            (bot.shortDescription || "").toLowerCase().includes(lowerSearchTerm) ||
                            (bot.description || "").toLowerCase().includes(lowerSearchTerm) ||
                            (bot.tags || []).some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
                            (bot.ownerUsername || "").toLowerCase().includes(lowerSearchTerm);
      
      let matchesCategory = true;
      if (categoryFilter !== "todos") {
        if (categoryFilter === "adicionados") {
          matchesCategory = bot.added;
        } else if (categoryFilter === "populares") {
          matchesCategory = bot.popular;
        } else {
          matchesCategory = (bot.tags || []).includes(categoryFilter);
        }
      }
      return matchesSearch && matchesCategory;
    });

    switch (sortOrder) {
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating_desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.ratingsCount || 0) - (a.ratingsCount || 0));
        break;
      case "servers_desc":
         filtered.sort((a, b) => (b.servers || 0) - (a.servers || 0));
        break;
      case "newest":
        filtered.sort((a,b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0) || b.id - a.id);
        break;
      default: // Default to rating_desc if sortOrder is unrecognized
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    return filtered;
  }, [bots, searchTerm, categoryFilter, sortOrder]);

  if (isLoading) {
    return <BotLoadingSpinner message="Convocando os melhores bots do multiverso... 🌌" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 120 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Explore <span className="text-primary">Nossos Bots</span> Mágicos
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-lg text-muted-foreground md:text-xl"
        >
          Encontre os bots perfeitos para seu servidor. Cuidado, alguns mordem... brincadeira! Ou não. 😜
        </motion.p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Procurar bots (eles são mestres do esconde-esconde)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md bg-background py-2 pl-10 pr-4 focus:ring-primary"
            aria-label="Pesquisar bots"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full min-w-[180px] rounded-md bg-background focus:ring-primary sm:w-auto" aria-label="Filtrar por categoria">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <BarChartBig className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full min-w-[180px] rounded-md bg-background focus:ring-primary sm:w-auto" aria-label="Ordenar por">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating_desc"><Star className="inline h-4 w-4 mr-1 text-yellow-400"/>Melhor Avaliados</SelectItem>
                <SelectItem value="servers_desc"><Users className="inline h-4 w-4 mr-1 text-blue-400"/>Mais Servidores</SelectItem>
                <SelectItem value="newest"><History className="inline h-4 w-4 mr-1 text-green-400"/>Mais Recentes</SelectItem>
                <SelectItem value="name_asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name_desc">Nome (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <BotList bots={filteredAndSortedBots} onAddBot={onToggleAddBot} onRemoveBot={onToggleAddBot} />
    </motion.div>
  );
};

export default BotsPage;