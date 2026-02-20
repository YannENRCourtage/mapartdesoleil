import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Eye, Search, Calendar, File, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDocuments } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const handleView = (doc) => {
    toast({ title: `Visualisation de : ${doc.name}`, description: "La visionneuse de documents s'ouvrirait ici." });
  };
  
  const handleDownload = (doc) => {
    toast({ title: `Téléchargement de : ${doc.name}`, description: "Le téléchargement du fichier commencerait." });
  };
  
  const handleUpload = () => {
    toast({
      title: "Chargement de document",
      description: "Cette fonctionnalité n'est pas encore implémentée."
    });
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Signé': return 'bg-green-100 text-green-800';
      case 'Disponible': return 'bg-blue-100 text-blue-800';
      case 'En attente de signature': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Contrat': return FileText;
      case 'Facture': return File;
      case 'Rapport': return FileText;
      default: return FileText;
    }
  };

  const documentTypes = [...new Set(documents.map(d => d.type))];

  return (
    <>
      <Helmet>
        <title>Mes documents - Ma part de soleil</title>
        <meta name="description" content="Consultez et téléchargez tous vos documents : contrats, factures, rapports de production et autres documents liés à vos investissements." />
      </Helmet>

      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Mes Documents</h1>
          <p className="text-muted-foreground mt-2">Consultez, gérez et téléchargez tous vos documents importants.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Vos documents</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full" />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrer par type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {documentTypes.map(type => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => {
                  const Icon = getTypeIcon(doc.type);
                  return (
                    <div key={doc.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-secondary transition-colors gap-4">
                      <div className="flex items-center gap-4 flex-grow">
                        <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div className="flex-grow">
                          <p className="font-semibold">{doc.name}</p>
                          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                            <span><Badge variant="outline">{doc.type}</Badge></span>
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(doc.date).toLocaleDateString()}</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                        <Button data-tooltip-id="main-tooltip" data-tooltip-content="Voir" variant="ghost" size="icon" onClick={() => handleView(doc)}><Eye className="h-4 w-4" /></Button>
                        <Button data-tooltip-id="main-tooltip" data-tooltip-content="Télécharger" variant="ghost" size="icon" onClick={() => handleDownload(doc)}><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  );
                })}
                {filteredDocuments.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Aucun document ne correspond à votre recherche.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default DocumentsPage;