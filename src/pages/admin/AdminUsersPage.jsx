import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { users as mockUsers } from '@/data/mockData';
import { allProjects as mockProjects } from '@/data/projects';
import { Search, ArrowLeft, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';

const AdminUsersPage = () => {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [projectFilter, setProjectFilter] = useState('all');
    const [editingUser, setEditingUser] = useState(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                user.firstName.toLowerCase().includes(searchLower) ||
                user.lastName.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower);

            const matchesProject = projectFilter === 'all' || user.projects.some(p => p.projectId === parseInt(projectFilter));

            return matchesSearch && matchesProject;
        });
    }, [users, searchTerm, projectFilter]);

    const handleExportUsers = () => {
        const usersData = filteredUsers.map(u => ({
            ID: u.id,
            Prénom: u.firstName,
            Nom: u.lastName,
            Email: u.email,
            Téléphone: u.phone,
            Ville: u.city,
            'Date Inscription': u.registrationDate,
            Statut: u.status,
            'Investissement Total (€)': u.totalInvestment,
            'Projets': u.projects.map(p => p.projectName).join(', '),
            PDL: u.pdl,
        }));
        const ws = utils.json_to_sheet(usersData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Utilisateurs");
        writeFile(wb, "utilisateurs_mapartdesoleil.xlsx");
        toast({
            title: "Exportation réussie",
            description: "La liste des utilisateurs filtrés a été téléchargée.",
        });
    };

    const handleSaveUser = () => {
        if (!editingUser) return;
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        toast({ title: "Utilisateur sauvegardé", description: "Les informations ont été mises à jour." });
        setEditingUser(null);
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
        toast({ title: "Utilisateur supprimé", description: "L'utilisateur a été supprimé avec succès." });
    };

    const handleAction = (action, user) => {
        if (action === 'edit') {
            setEditingUser({ ...user });
        } else if (action === 'view') {
            toast({
                title: `Action: ${action}`,
                description: `Fonctionnalité non implémentée pour l'utilisateur ID: ${user.id}.`
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Gestion des utilisateurs - Admin</title>
            </Helmet>
            <div className="container py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour au tableau de bord
                    </Button>
                    <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
                    <p className="text-muted-foreground mt-2">Consultez, filtrez et gérez tous les utilisateurs de la plateforme.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="mt-8">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative flex-grow">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-full"
                                        />
                                    </div>
                                    <Select value={projectFilter} onValueChange={setProjectFilter}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Filtrer par projet" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tous les projets</SelectItem>
                                            {mockProjects.map(p => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleExportUsers}><Download className="mr-2 h-4 w-4" /> Exporter</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Utilisateur</TableHead>
                                        <TableHead>Date d'adhésion</TableHead>
                                        <TableHead>Projets</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.slice(0, 15).map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="font-medium">{user.firstName} {user.lastName}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </TableCell>
                                            <TableCell>{new Date(user.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
                                            <TableCell>{user.projects.length > 0 ? user.projects.length : 0}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button data-tooltip-id="main-tooltip" data-tooltip-content="Voir" variant="ghost" size="icon" onClick={() => handleAction('view', user)}><Eye className="h-4 w-4" /></Button>
                                                    <Button data-tooltip-id="main-tooltip" data-tooltip-content="Modifier" variant="ghost" size="icon" onClick={() => handleAction('edit', user)}><Edit className="h-4 w-4" /></Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button data-tooltip-id="main-tooltip" data-tooltip-content="Supprimer" variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
                                                                <AlertDialogDescription>Cette action est irréversible et supprimera définitivement le compte de {user.firstName} {user.lastName}.</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">Supprimer</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {filteredUsers.length === 0 && <p className="text-center text-muted-foreground py-8">Aucun utilisateur ne correspond à votre recherche.</p>}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            {editingUser && (
                <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modifier l'utilisateur</DialogTitle>
                            <DialogDescription>{editingUser.firstName} {editingUser.lastName}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input id="firstName" value={editingUser.firstName} onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })} />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input id="lastName" value={editingUser.lastName} onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="status">Statut</Label>
                                <Select value={editingUser.status} onValueChange={(value) => setEditingUser({ ...editingUser, status: value })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Actif">Actif</SelectItem>
                                        <SelectItem value="En attente">En attente</SelectItem>
                                        <SelectItem value="Inactif">Inactif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setEditingUser(null)}>Annuler</Button>
                            <Button onClick={handleSaveUser}>Sauvegarder</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default AdminUsersPage;