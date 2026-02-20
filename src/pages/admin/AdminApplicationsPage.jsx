import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, MessageSquare, FileText, Download, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const AdminApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [dialogAction, setDialogAction] = useState(null); // 'approve', 'reject', 'requestInfo'
    const [infoMessage, setInfoMessage] = useState('');
    const { toast } = useToast();
    
    useEffect(() => {
        const storedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        setApplications(storedApplications.filter(a => a.status === 'En attente'));
    }, []);

    const handleActionClick = (app, action) => {
        setSelectedApp(app);
        setDialogAction(action);
    };

    const confirmAction = () => {
        if (!selectedApp || !dialogAction) return;

        let title = '', description = '', variant = 'default';
        let updatedStatus = selectedApp.status;

        switch(dialogAction) {
            case 'approve':
                title = 'Adhésion Validée';
                description = `L'utilisateur ${selectedApp.firstName} va être notifié pour la signature électronique.`;
                updatedStatus = 'Accepté - En attente de signature';
                
                // Notification for user
                const userNotifs = JSON.parse(localStorage.getItem(`notifications_${selectedApp.userId}`) || '[]');
                userNotifs.push({
                    id: Date.now(),
                    title: `Votre adhésion au projet "${selectedApp.projects[0].projectName}" a été validée !`,
                    message: "Veuillez maintenant signer électroniquement le contrat et le mandat SEPA.",
                    date: new Date().toISOString(),
                    read: false,
                    actionRequired: true,
                    actionLink: `/signature/${selectedApp.id}`
                });
                localStorage.setItem(`notifications_${selectedApp.userId}`, JSON.stringify(userNotifs));
                break;
            case 'reject':
                title = 'Adhésion Refusée';
                description = `L'adhésion de ${selectedApp.firstName} a été refusée.`;
                updatedStatus = 'Refusé';
                variant = 'destructive';
                break;
            case 'requestInfo':
                if (!infoMessage.trim()) {
                    toast({ title: "Message vide", variant: "destructive" });
                    return;
                }
                title = 'Demande d\'information envoyée';
                description = `Un message a été envoyé à ${selectedApp.firstName}.`;
                updatedStatus = 'Information complémentaire demandée';
                break;
        }

        const allApps = JSON.parse(localStorage.getItem('applications') || '[]');
        const updatedApps = allApps.map(a => a.id === selectedApp.id ? { ...a, status: updatedStatus } : a);
        localStorage.setItem('applications', JSON.stringify(updatedApps));

        setApplications(updatedApps.filter(a => a.status === 'En attente'));
        toast({ title, description, variant });
        setDialogAction(null);
        setSelectedApp(null);
        setInfoMessage('');
    };

    const handleDownloadDoc = (docName) => {
        toast({ title: "Téléchargement simulé", description: `Le document "${docName}" serait téléchargé.` });
    };

    return (
        <>
            <Helmet><title>Validation des Adhésions - Admin</title></Helmet>
            <div className="container py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold">Validation des Adhésions</h1>
                    <p className="text-muted-foreground mt-2">Examinez et traitez les demandes de participation aux projets.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="mt-8">
                        <CardHeader><CardTitle>Demandes en attente</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Utilisateur</TableHead><TableHead>Projet</TableHead><TableHead>Documents</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {applications.length > 0 ? applications.map(app => (
                                        <TableRow key={app.id}>
                                            <TableCell><div className="font-medium">{app.firstName} {app.lastName}</div><div className="text-sm text-muted-foreground">{app.email}</div></TableCell>
                                            <TableCell>{app.projects[0].projectName}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">{app.submittedDocs.map((doc, index) => (
                                                    <div key={index} className="flex items-center gap-1 w-fit">
                                                        <Badge variant="secondary" className="flex items-center gap-1"><FileText size={12} />{doc.name}</Badge>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDownloadDoc(doc.name)}><Download size={12} /></Button>
                                                    </div>))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-1 justify-end">
                                                    <Button size="icon" variant="outline" className="bg-green-50 hover:bg-green-100" onClick={() => handleActionClick(app, 'approve')}><Check className="h-4 w-4 text-green-600" /></Button>
                                                    <Button size="icon" variant="outline" className="bg-red-50 hover:bg-red-100" onClick={() => handleActionClick(app, 'reject')}><X className="h-4 w-4 text-red-600" /></Button>
                                                    <Button size="icon" variant="outline" className="bg-blue-50 hover:bg-blue-100" onClick={() => handleActionClick(app, 'requestInfo')}><MessageSquare className="h-4 w-4 text-blue-600" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={4} className="text-center h-24">Aucune demande en attente.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <Dialog open={!!dialogAction} onOpenChange={() => setDialogAction(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogAction === 'approve' && 'Confirmer la validation'}
                            {dialogAction === 'reject' && 'Confirmer le refus'}
                            {dialogAction === 'requestInfo' && 'Demande d\'information'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogAction === 'approve' && `Valider l'adhésion de ${selectedApp?.firstName} ?`}
                            {dialogAction === 'reject' && `Refuser l'adhésion de ${selectedApp?.firstName} ?`}
                            {dialogAction === 'requestInfo' && `Envoyer un message à ${selectedApp?.firstName} (${selectedApp?.email})`}
                        </DialogDescription>
                    </DialogHeader>
                    {dialogAction === 'requestInfo' && <div className="py-4"><Textarea placeholder="Votre message..." value={infoMessage} onChange={(e) => setInfoMessage(e.target.value)} /></div>}
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setDialogAction(null)}>Annuler</Button>
                        <Button onClick={confirmAction} variant={dialogAction === 'reject' ? 'destructive' : 'default'}>Confirmer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminApplicationsPage;